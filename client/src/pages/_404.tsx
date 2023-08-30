import { useNavigate } from "react-router-dom";
import Metadata from "../components/Metadata";

const _404 = () => {
  //hooks
  const navigate = useNavigate();

  return (
    <section id="_404">
      <Metadata title="not found" />

      <h1>
        4<span>0</span>
        <span>4</span>
      </h1>
      <h3>Opssss! Page not found!</h3>
      <p>
        The page you are looking for might have been removed or temporarily
        unavailable.
      </p>
      <button onClick={() => navigate(-1)}>back</button>
    </section>
  );
};

export default _404;
