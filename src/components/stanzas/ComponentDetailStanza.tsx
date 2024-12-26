import { FC } from "react";

type Props = {
  gmoId: string;
};

export const ComponentDetailStanza: FC<Props> = ({ gmoId }) => {
  return (
    <div>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-component-by-gmoid.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-component-by-gmoid
        gmo_id={gmoId}
        togostanza-menu-placement="none"
      ></togostanza-gmdb-component-by-gmoid>
    </div>
  );
};
