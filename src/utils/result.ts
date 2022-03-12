interface Result<T, F> {
  isSuccess(): this is T;
  isFailure(): this is F;
  readonly value: T | F;
}

class Success<T, E> implements Result<T, E> {
  constructor(readonly value: T);

  //readonly value:T = this._value

  isSuccess(): this is T {
    return true;
  }

  isFailure(): this is E {
    return false;
  }
}

class Failure<T, E> implements Result<T, E> {
  constructor(readonly value: E);

  //readonly value:E = this._value

  isSuccess(): this is T {
    return false;
  }
  isFailure(): this is E {
    return true;
  }
}

function success<T, F>(value: T) {
  return new Success<T, F>(value);
}

function failure<T, F>(value: F) {
  return new Failure<T, F>(value);
}

export { Result, Success, Failure, success, failure };
