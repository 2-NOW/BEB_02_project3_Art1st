import Link from "next/link";
import { useRouter } from "next/router";

import { Typography, Box } from "@mui/material";

interface NavLinkProps {
  menu: string[];
}

const linkCss = {
  "&:hover": {
    color: "rgba(186, 42, 43, 1)",
    transition: "color 150ms",
  },
  ml: "1.5rem",
};

function NavLink({ menu }: NavLinkProps) {
  return (
    <Box sx={{ display: "flex", ml: "1.5rem" }}>
      {menu.map((text) => {
        const url = "/" + text.toLowerCase();
        const { pathname } = useRouter();

        return (
          <Link href={url}>
            <a>
              <Typography
                sx={{
                  ...linkCss,
                  color: pathname === url ? "rgba(186, 42, 43, 1)" : null,
                }}
                variant="h6"
                component="div"
                gutterBottom
              >
                {text}
              </Typography>
            </a>
          </Link>
        );
      })}
    </Box>
  );
}

export default NavLink;
