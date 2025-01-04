import { FC } from "react";

type Props = {
  className?: string;
};

export const MediumIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 416 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M416 352c0-86.52-52.85-160.65-128-192.01V32h24c4.42 0 8-3.58 8-8V8c0-4.42-3.58-8-8-8H104c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h24v127.99C52.85 191.35 0 265.48 0 352c0 53.79 20.43 102.79 53.94 139.7 11.95 13.17 29.21 20.3 47 20.3h214.04c18.06 0 35.49-7.44 47.58-20.85 12.92-14.34 53.24-61.93 53.14-139.15h.3zM140.32 189.53l19.68-8.21V32h96v149.32l19.68 8.21C336.49 214.9 377.11 271.36 382.97 336h-51.35c-28.66 0-57.41-7.59-83.09-21.97-61.81-34.56-135.62-34.56-197.44 0l-16.6 9.29c9.73-59.28 49.03-110.1 105.83-133.79zm198.47 280.19c-5.89 6.53-14.56 10.28-23.81 10.28H100.94c-9.15 0-17.65-3.57-23.3-9.8-27.4-30.19-42.74-68.76-44.81-109.27l33.89-18.96c52.09-29.11 114.22-29.08 166.19 0C263.38 359 297.5 368 331.62 368h50.99c-3.45 37.65-18.35 73.46-43.82 101.72z"
      ></path>
    </svg>
  );
};
