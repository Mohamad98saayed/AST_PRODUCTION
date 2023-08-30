import Metadata from "../components/Metadata";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOneCarAsync,
  deleteCarAsync,
  reset,
} from "../state/features/car/carSlice";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useEffect } from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const settings = {
  infinite: true,
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
};

const OneCar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const id: string | any = params.id;
  const { car, isLoading, response } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getOneCarAsync(id));

    if (response?.success) {
      navigate(-1);
      dispatch(reset());
    }
  }, [dispatch, id, navigate, response?.success]);

  return (
    <section id="one-car">
      <Metadata title={`${params.id}`} />
      {!isLoading ? (
        <>
          <div className="carousel">
            <Slider {...settings}>
              {car?.car?.images?.map((image: { url: string; _id: string }) => (
                <div className="image" key={image._id}>
                  <img height="500px" width="500px" src={image.url} alt="car" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="data">
            <h3>
              {car?.car?.manufacturer} - {car?.car?.model} - {car?.car?.year}
            </h3>
            <p>
              Transmition: <span>{car?.car?.transmition}</span>
            </p>
            <p>
              Color: <span>{car?.car?.color}</span>
            </p>
            <p>
              Fuel Type: <span>{car?.car?.fuelType}</span>
            </p>
            <p>
              Price: <span>$ {car?.car?.price}</span>
            </p>
            <p>
              Owner: <span>{car?.car?.user?.name}</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Maxime mollitia, molestiae quas vel
              sint commodi repudiandae consequuntur voluptatum laborum numquam
              blanditiis harum quisquam eius sed odit fugiat iusto fuga
              praesentium optio, eaque rerum! Provident similique accusantium
              nemo autem.
            </p>
            <button onClick={() => navigate(`/cars/update/${car?.car?._id}`)}>
              update
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                dispatch(deleteCarAsync(id));
              }}
            >
              delete
            </button>
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </section>
  );
};

export default OneCar;
