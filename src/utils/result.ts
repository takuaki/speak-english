interface Result<T, F> {
  isSuccess(): this is Success<T, F>;
  isFailure(): this is Failure<T, F>;
  readonly value: T | F;
  flatMap<R, L>(fnL: (f: F) => L, fnR: (t: T) => R): Result<R, L>;
  //flatMap<R, F>(fnR: (t: T) => R): Result<R, F>;
  //flatMap<T, L>(fnL: (f: F) => L): Result<T, L>;
  //map(fn:(t:T)=>any, fn:(f:F)=>any): Result<T, F>;
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

  flatMap<R, L>(fnL: (f: E) => L, fnR: (t: T) => R): Result<R, L> {
    return success<R, L>(fnR(this.value));
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

  flatMap<R, L>(fnL: (f: E) => L, fnR: (t: T) => R): Result<R, L> {
    return failure<R, L>(fnL(this.value));
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
