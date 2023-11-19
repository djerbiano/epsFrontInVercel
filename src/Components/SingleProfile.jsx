import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { useParams } from "react-router-dom";
import LogoVerifiyProfile from "./ReusableComponent/VerifyProfile";
const ContainerPictureProfile = styled.div`
  width: 100%;
  min-height: 200px;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContPictureProfile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
`;

const ProfilePicture = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 70px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ContainerName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    margin-bottom: 20px;
  }
`;

const UpdateProfile = styled.div``;

const UpdateProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #0e9efe8f;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin: 10px;
  &:hover {
    background-color: #d5dce4;
    box-shadow: 0 0 5px #d5dce4;
    transition: 0.5s;
  }
`;

const UpdateRefuseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: red;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin: 10px;
  &:hover {
    background-color: #d5dce4;
    box-shadow: 0 0 5px #d5dce4;
    transition: 0.5s;
  }
`;
function SingleProfile() {
  const navigate = useNavigate();
  const [messageToUser, setMessageToUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const { id } = useParams();
  const currentUser = sessionStorage.getItem("userId");
  const verifyProfile = userInfo.verifyProfile;
  const [stateFriends, setStateFriends] = useState("");
  const [refuseInvitation, setRefuseInvitation] = useState(false);
  const [deleteInvitation, setDeleteInvitation] = useState(false);
  const ApiAdresse = process.env.REACT_APP_URL_SERVER;

  // information sur le user recherché
  useEffect(() => {
    fetch(`${ApiAdresse}/api/users/${id}`, {
      method: "GET",
      headers: {
        
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) {
          setAvatar(data.avatar);
          setUserInfo(data);
        } else {
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [id]);

  // vérification du lien entre currentUser et user recherché

  useEffect(() => {
    if (id === currentUser) {
      return navigate("/profile");
    }
    fetch(`${ApiAdresse}/api/invitations/${currentUser}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStateFriends(data.message);
        if (data.message === "Accepter l'invitation") {
          setRefuseInvitation(true);
        }

        if (data.message === "Ami") {
          setDeleteInvitation(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [id]);

  const handleInvitation = (e) => {
    //Envoyer une invitation
    if (e.target.value === "Inviter") {
      fetch(`${ApiAdresse}/api/invitations/${currentUser}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessageToUser(data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setMessageToUser(error);
        });
    }

    //Accepter une invitation
    if (e.target.value === "Accepter l'invitation") {
      setRefuseInvitation(true);
      fetch(`${ApiAdresse}/api/invitations/${currentUser}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessageToUser(data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setMessageToUser(error);
        });
    }

    //Refuser une invitation
    if (e.target.value === "Refuser l'invitation") {
      fetch(`${ApiAdresse}/api/invitations/${currentUser}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessageToUser(data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setMessageToUser(error);
        });
    }

    // Supprimer un ami
    if (e.target.value === "Supprimer de la liste") {
      fetch(
        `${ApiAdresse}/api/invitations/deleteFriend/${currentUser}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setMessageToUser(data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setMessageToUser(error);
        });
    }
  };

  return (
    <>
      <Header />
      <ContainerPictureProfile>
        <ContPictureProfile>
          <ProfilePicture>
            <ProfileImage src={`${ApiAdresse}/images/${avatar}`} alt="" />
            <ContainerName>
              <h3>{userInfo.userName}</h3>
              {verifyProfile && <LogoVerifiyProfile />}
            </ContainerName>
          </ProfilePicture>

          <UpdateProfile>
            <UpdateProfileButton
              data-custom-value={stateFriends}
              type="button"
              value={stateFriends}
              onClick={handleInvitation}
            >
              {stateFriends}
            </UpdateProfileButton>

            {refuseInvitation && (
              <UpdateRefuseButton
                type="button"
                value="Refuser l'invitation"
                onClick={handleInvitation}
              >
                Refuser l'invitation
              </UpdateRefuseButton>
            )}

            {deleteInvitation && (
              <UpdateRefuseButton
                type="button"
                value="Supprimer de la liste"
                onClick={handleInvitation}
              >
                Supprimer de la liste
              </UpdateRefuseButton>
            )}
          </UpdateProfile>
        </ContPictureProfile>
        <hr width="90%" color="#d5dce4" size="3" />

        {messageToUser && <p>{messageToUser}</p>}

        <ContainerPictureProfile />
      </ContainerPictureProfile>
    </>
  );
}

export default SingleProfile;
