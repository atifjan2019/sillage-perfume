import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 18, children, ...rest }: IconProps & { children: React.ReactNode }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            {children}
        </svg>
    );
}

export function DashboardIcon(props: IconProps) {
    return (
        <Base {...props}>
            <rect x="3" y="3" width="7" height="9" rx="1" />
            <rect x="14" y="3" width="7" height="5" rx="1" />
            <rect x="14" y="12" width="7" height="9" rx="1" />
            <rect x="3" y="16" width="7" height="5" rx="1" />
        </Base>
    );
}

export function BottleIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M9 3h6v3a3 3 0 0 1 3 3v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a3 3 0 0 1 3-3V3z" />
            <path d="M9 13h6" />
        </Base>
    );
}

export function FolderIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        </Base>
    );
}

export function PackageIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
            <path d="M3 8l9 5 9-5" />
            <path d="M12 13v8" />
        </Base>
    );
}

export function CartAbandonedIcon(props: IconProps) {
    return (
        <Base {...props}>
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="17" cy="20" r="1.4" />
            <path d="M3 4h2l2.5 11h11l2-7H7" />
            <path d="M19 5l3 3M22 5l-3 3" />
        </Base>
    );
}

export function CashIcon(props: IconProps) {
    return (
        <Base {...props}>
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M6 10v.01M18 14v.01" />
        </Base>
    );
}

export function CardIcon(props: IconProps) {
    return (
        <Base {...props}>
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M6 15h3" />
        </Base>
    );
}

export function MailIcon(props: IconProps) {
    return (
        <Base {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </Base>
    );
}

export function PhoneIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19 19 0 0 1-8.3-3 19 19 0 0 1-6-6A19 19 0 0 1 3.1 4.1 1 1 0 0 1 4.1 3h4.1a1 1 0 0 1 1 .8 12 12 0 0 0 .6 2.6 1 1 0 0 1-.2 1L8 9a16 16 0 0 0 7 7l1.5-1.5a1 1 0 0 1 1-.2 12 12 0 0 0 2.6.6 1 1 0 0 1 .8 1z" />
        </Base>
    );
}

export function PinIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.5" />
        </Base>
    );
}

export function ClockIcon(props: IconProps) {
    return (
        <Base {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </Base>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M5 13l4 4L19 7" />
        </Base>
    );
}

export function TruckIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M3 7h11v9H3z" />
            <path d="M14 10h4l3 3v3h-7" />
            <circle cx="7" cy="18" r="1.6" />
            <circle cx="17" cy="18" r="1.6" />
        </Base>
    );
}

export function LockIcon(props: IconProps) {
    return (
        <Base {...props}>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </Base>
    );
}

export function ReturnIcon(props: IconProps) {
    return (
        <Base {...props}>
            <path d="M3 7h11a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6H8" />
            <path d="m6 4-3 3 3 3" />
        </Base>
    );
}

export function SettingsIcon(props: IconProps) {
    return (
        <Base {...props}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </Base>
    );
}

export function SeoIcon(props: IconProps) {
    return (
        <Base {...props}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
            <path d="M9 11h4M11 9v4" />
        </Base>
    );
}
