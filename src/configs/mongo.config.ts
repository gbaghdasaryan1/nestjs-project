import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  console.log(getMongoString(configService));

  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  `mongodb+srv://${configService.get('MONGO_LOGIN')}:${configService.get(
    'MONGO_PASSWORD',
  )}@cluster0.jecroyn.mongodb.net/?retryWrites=true&w=majority`;

const getMongoOptions = () => ({
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});
