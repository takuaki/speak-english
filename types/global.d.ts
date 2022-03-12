type Ref = import("vue").Ref;

declare type User = {
  uid: string;
  displayName: string | null;
};

declare type MaybeRef<T> = T | Ref<T>;
