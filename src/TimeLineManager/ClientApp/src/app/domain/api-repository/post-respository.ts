export abstract class PostRepository<T> {
  abstract getAll();
  abstract getById(id: number);
  abstract create(param: T);
  abstract update(id: number, param: T);
  abstract delete(id: number);
}
