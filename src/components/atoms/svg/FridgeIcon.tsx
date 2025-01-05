import { FC } from "react";

type Props = {
  className?: string;
};

export const FridgeIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M288 32c35.3 0 64 28.7 64 64l0 64-64 0 0-48c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 48L32 160l0-64c0-35.3 28.7-64 64-64l192 0zM256 192l0 176c0 8.8 7.2 16 16 16s16-7.2 16-16l0-176 64 0 0 256c0 17.7-14.3 32-32 32L64 480c-17.7 0-32-14.3-32-32l0-256 224 0zM96 0C43 0 0 43 0 96L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-352c0-53-43-96-96-96L96 0z"
      />
    </svg>
  );
};
