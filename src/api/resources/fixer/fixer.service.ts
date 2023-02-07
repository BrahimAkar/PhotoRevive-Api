/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service, Inject } from 'typedi';
import axios from 'axios';

@Service()
export default class FixerService {
  constructor(@Inject('logger') private logger) {}

  public async fixAnImage(string: imageURL): Promise<{ imageURL: string }> {
    try {
      const startResponse = await axios('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
        },
        body: JSON.stringify({
          version: '9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3',
          input: { img: imageUrl, version: 'v1.4', scale: 2 },
        }),
      });
      return { imageURL: fakeImageURL };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
