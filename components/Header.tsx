import InstagramLogo from "../public/instagram.svg";
import Link from "next/link";
import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";
import { Button } from "./Button";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { useCurrentUser } from "../data/queries/useCurrentUser";
import { useMemo } from "react";

interface IHeaderProps {
  showAddPost?: boolean;
}

export const Header = (props: IHeaderProps) => {
  //
  const { showAddPost } = props;

  const router = useRouter();

  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-row items-center justify-between w-full h-24">
      <Link href="/">
        <a>
          <Image
            src={InstagramLogo}
            alt="Instagram logo | Home"
            className="object-contain"
            height={50}
            width={140}
          />
        </a>
      </Link>
      <div className="flex flex-row items-center">
        {showAddPost && (
          <div className="mr-4 w-28">
            <Button onClick={() => router.push("/post")}>Add Post</Button>
          </div>
        )}
        <Link href="/likes">
          <a>
            <MdFavoriteBorder className="w-8 h-8 mr-4 text-gray-600" />
          </a>
        </Link>
        <div className="relative w-10 h-10">
          <Link href={`/user/${user?.username}`}>
            <a className="absolute w-full h-full overflow-hidden bg-gray-300 rounded-full">
              {user && (
                <Image
                  src={user.profilePicture}
                  className="w-full h-full"
                  alt={`${user?.firstName} ${user?.lastName}`}
                  layout="fill"
                />
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
