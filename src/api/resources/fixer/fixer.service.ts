/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service, Inject } from 'typedi';
import axios from 'axios';
import config from '@/config';

@Service()
export default class FixerService {
  constructor(@Inject('logger') private logger) {}

  public async fixAnImage(imageURL: string): Promise<{ imageURL: string }> {
    try {
      const startResponse = await axios('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
        },
        data: JSON.stringify({
          version: config.AiModelsVersions.faceRestoration,
          input: { img: imageURL, version: 'v1.4', scale: 2 },
        }),
      });
      const endpointUrl = startResponse.data.urls.get;

      // GET request to get the status of the image restoration process & return the result when it's ready
      let restoredImage: string | null = null;
      while (restoredImage === null) {
        this.logger.info('Waiting for image restoration to finish... ⏳');
        const statusResponse = await axios(endpointUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
          },
        });
        if (statusResponse.data.status === 'succeeded') {
          restoredImage = statusResponse.data.output;
        } else if (statusResponse.data.status === 'failed') {
          break;
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return { imageURL: restoredImage ? restoredImage : null };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
