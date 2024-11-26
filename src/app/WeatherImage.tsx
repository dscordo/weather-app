import Image from 'next/image';

interface WeatherObj {
  description: string;
  icon: string;
}

export default function WeatherImage({
  weatherObj,
}: {
  weatherObj: WeatherObj;
}) {
  return (
    <Image
      alt={weatherObj.description}
      src={`https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`}
      width={80}
      height={80}
    />
  );
}
