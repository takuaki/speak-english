type Ref = import("vue").Ref;
type User = import("firebase/auth").User;

/*declare type User = {
  uid: string;
  displayName: string | null;
};*/
declare type User = User;

declare type MaybeRef<T> = T | Ref<T>;
