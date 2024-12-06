import { Skeleton, SkeletonProps } from "@/components/daisyui";

type LoadingEffectProps = {
    width?: number;
    height?: number;
} & SkeletonProps;

const LoadingEffect = ({ width, height, className }: LoadingEffectProps) => {
    return <Skeleton className={className} style={{ width, height }} />;
};

export { LoadingEffect };
