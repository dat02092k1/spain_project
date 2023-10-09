import BaseScreen from "../components/BaseScreen/BaseScreen";
import Signup_form from "../components/Form/Signup_form";

function Signup() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <BaseScreen />
        <div className="bg-gray-800 flex flex-col justify-center">
          <Signup_form />
        </div>
      </div>
    </>
  );
}

export default Signup;
