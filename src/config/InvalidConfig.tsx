import config from './config';

const InvalidConfig = () => {
  return (
    <div>
      <h3>ERROR: Invalid configuration, please check 'config.json'.</h3>
      {config.validation_messages.map((msg: string) => (
        <div>{msg}</div>
      ))}
    </div>
  );
};

export default InvalidConfig;