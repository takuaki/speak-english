interface Result<T, F> {
  isSuccess(): this is Success<T, F>;
  isFailure(): this is Failure<T, F>;
  readonly value: T | F;
}

class Success<T, E> implements Result<T, E> {
  constructor(value: T) {
    this.value = value;
  }

  readonly value: T;

  isSuccess() {
    return true;
  }

  isFailure() {
    return false;
  }
}

class Failure<T, E> implements Result<T, E> {
  constructor(value: E) {
    this.value = value;
  }

  readonly value: E;

  isSuccess() {
    return false;
  }

  isFailure() {
    return true;
  }
}

function success<T, F>(value: T) {
  return new Success<T, F>(value);
}

function failure<T, F>(value: F) {
  return new Failure<T, F>(value);
}

export { Success, Failure, success, failure };
export type { Result };
