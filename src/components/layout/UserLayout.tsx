import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import UserNav from "../nav/UserNav";
import { Stack, Paper, Box } from "@mui/material";

type LayoutProps = {
  children?: React.ReactNode;
};

export const UserLayout = ({ children }: LayoutProps) => {
  const classes = useRotateIconStyles();
  // state
  const [ok, setOk] = useState<boolean>(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <SyncOutlined className={classes.rotateIcon} />
        </Stack>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <UserNav />
          </Box>
          <Suspense>{children}</Suspense>
        </Box>
      )}
    </>
  );
};
