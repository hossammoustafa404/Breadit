import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User2 } from "lucide-react";

// Types
interface props extends AvatarProps {
  image: string;
}

const UserAvatar: FC<props> = ({ image, ...props }) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={image} />
      <AvatarFallback>
        <User2 />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
