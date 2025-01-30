class Asynck {
    constructor(config = {}) {
        this.url = config.url || '';
        this.method = config.method || 'GET';
        this.data = config.data || null;
        this.headers = config.headers || {};
        this.worker = null;  // Web Worker instance
        this.messageHandler = config.messageHandler || null; // Optional message handler

        if (this.messageHandler) {
            window.addEventListener('message', this.messageHandler);
        }
    }

    // Create and start the Web Worker
    _startWorker() {
        this.worker = new Worker('worker.js'); // Assuming worker.js is in the same directory
        this.worker.onmessage = (e) => this._handleWorkerResponse(e);
        this.worker.onerror = (e) => this._handleWorkerError(e);
    }

    // Handle the worker's response
    _handleWorkerResponse(e) {
        const { status, response, error } = e.data;
        if (status === 'success') {
            if (this.onSuccess) this.onSuccess(response);
        } else {
            if (this.onError) this.onError(error);
        }

        // Clean up worker after response
        this.worker.terminate();
    }

    // Handle errors from the worker
    _handleWorkerError(e) {
        console.error('Worker error:', e);
        if (this.onError) this.onError('Worker failed');
        this.worker.terminate();
    }

    // Send the request using the worker
    send() {
        this._startWorker();

        // Send the message to the worker with the necessary details
        this.worker.postMessage({
            url: this.url,
            method: this.method,
            data: this.data,
            headers: this.headers
        });

        return this; // Allows chaining
    }

    onProgress(callback) {
        // Optionally handle progress here if needed
        return this; // For chaining
    }

    then(onSuccess, onError) {
        this.onSuccess = onSuccess;
        this.onError = onError;
        return this; // For chaining
    }

    catch(onError) {
        this.onError = onError;
        return this; // For chaining
    }

    postMessage(message, targetOrigin) {
        window.postMessage(message, targetOrigin);
    }

    removeMessageHandler() {
        if (this.messageHandler) {
            window.removeEventListener('message', this.messageHandler);
        }
    }
}

// Exporting the Asynck class for use in other modules or files
export default Asynck;
