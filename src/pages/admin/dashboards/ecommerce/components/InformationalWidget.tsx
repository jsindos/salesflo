import { Icon } from "@/components/Icon";
import { IconifyIcon } from "@iconify/react/dist/iconify.js";

export default ({
  icon,
  heading,
  secondaryHeading,
  content,
}: {
  icon?: IconifyIcon;
  heading?: string;
  secondaryHeading?: string;
  content: string;
}) => {
  return (
    <div className="mt-3 rounded bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        {icon && <Icon icon={icon} fontSize={18} className="text-primary" />}
        {heading && <span className="text-base font-medium text-primary">{heading}</span>}
        {secondaryHeading && <span className="ms-auto text-sm font-semibold text-primary">{secondaryHeading}</span>}
        <p className="text-sm font-medium text-base-content/70">{content}</p>
      </div>
      {/* <p className="mt-3 text-sm font-medium text-base-content/70">{content}</p> */}
      {/* <Progress max={250} value={160} color={"primary"} className="mt-0 h-1.5 bg-primary/20" /> */}
    </div>
  );
};
