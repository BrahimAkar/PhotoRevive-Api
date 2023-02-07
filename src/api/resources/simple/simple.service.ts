// import SimpleModel from '@/resources/post/post.model';
// import ISimple from './simple.interface';

class SimpleService {
  //   private post = SimpleModel;
  /**
   * Get A Simple String
   */
  public getSimple = async (): Promise<string> => {
    try {
      return Promise.resolve('Hello World 2');
    } catch (error) {
      throw new Error('Error creating post');
    }
  };
}

export default SimpleService;
