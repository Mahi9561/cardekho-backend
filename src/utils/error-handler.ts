export class RuntimeError extends Error {
    public status;

    public innerError;

    constructor(message: string, error: Error) {
        super(message);
        this.status = 500;
        this.name = 'RuntimeError';
        this.innerError = error;
    }
}
export class DatabaseError extends Error {
    public status;

    constructor(error: Error | any) {
        super(error instanceof Error ? error.message : String(error));
        this.status = 500;
        this.name = error?.name || 'DatabaseError';

        const stackCandidate =
            error?.original?.stack ?? error?.original ?? error?.stack;

        if (typeof stackCandidate === 'string') {
            this.stack = stackCandidate;
        } else if (stackCandidate) {
            this.stack = String(stackCandidate);
        }
    }
}

export class ClientInputError extends Error {
    public status;

    constructor(message: string) {
        super(message);
        this.status = 400;
        this.name = 'ClientInputError';
    }
}

export class NotFoundError extends Error {
    public status;

    constructor(message: string) {
        super(message || 'Not found');
        this.status = 404;
        this.name = 'NotFoundError';
    }
}

export class TokenExpiredError extends Error {
    public status;

    constructor(message: string) {
        super(message || 'Token expired');
        this.status = 401;
        this.name = 'TokenExpiredError';
    }
}

export class AxiosError extends Error {
    constructor(err: Error, message: string) {
        const newMessage = message || err?.message;

        super(newMessage);

        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, AxiosError);

        this.name = 'AxiosError';
    }
}
export class ConflictError extends Error {
    public status;

    constructor(message: string) {
        super(message);
        this.status = 409;
        this.name = 'ConflictError';
    }
}
export class SQSError extends Error {
    public status;

    constructor(message: string) {
        super(message);
        this.status = 500;
        this.name = 'SQSError';
    }
}
