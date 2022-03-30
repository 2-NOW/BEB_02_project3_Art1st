import Profile from "@/container/ArtDetail/UserProfile/Profile";
import OtherWorks from "@/container/ArtDetail/UserProfile/OtherWorks";
import Divider from "@mui/material/Divider";

function index() {
  return (
    <>
      <Divider sx={{ mt: "20vh" }} />
      <Profile name={""} avatar={""} description={""} />
      <OtherWorks />
    </>
  );
}

export default index;
