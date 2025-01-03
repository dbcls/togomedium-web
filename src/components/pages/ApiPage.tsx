import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export const ApiPage = () => {
  return (
    <div className={"flex grow flex-col"}>
      <ApiReferenceReact
        configuration={{
          theme: "default",
          forceDarkModeState: "light",
          spec: {
            url: "/assets/togomedium-api.json",
          },
        }}
      />
    </div>
  );
};

// <script>
// 	var configuration = {
// 	theme: 'default',
// 	forceDarkModeState: 'light',
// 	hiddenClients: true
//
// }
// 	document.getElementById('api-reference').dataset.configuration = JSON.stringify(configuration);
// 	console.log(document.getElementById('api-reference')); </script>
