import BaseScreen from "../components/BaseScreen/BaseScreen";
import Signin_form from "../components/Form/Signin_form";

function Signin() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <BaseScreen />
        <div className="bg-gray-800 flex flex-col justify-center">
          <Signin_form />
        </div>
      </div>

      {/* <Signin_form /> */}
    </>
  );
}

export default Signin;
