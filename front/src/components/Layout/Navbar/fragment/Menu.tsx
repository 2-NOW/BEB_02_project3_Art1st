import { useRouter } from "next/router";
import Link from "next/link";

const menuData = [
  { id: "menu01", name: "Main", path: "/" },
  { id: "menu02", name: "Discover", path: "/discover" },
];

const Menu = () => {
  const router = useRouter();

  return (
    <div>
      <ul style={{ margin: "20px 0 0 -2rem" }}>
        {menuData.map((menu) => {
          return (
            <li
              key={menu.id}
              style={{ display: "inline", marginRight: "20px" }}
            >
              <Link href={menu.path}>
                <a
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: menu.path === router.pathname ? "#D9001D" : "black",
                  }}
                >
                  {menu.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
