interface FileUploadProps {
	id: string;
	onFileSelected?: (file: File) => void;
	accpet?: string;
	text?: string;
	className?: string;
	secondary?: boolean;
}

export type { FileUploadProps };
