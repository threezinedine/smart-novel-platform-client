import React, { useRef } from "react";
import { FileUploadProps } from "./Props";
import styles from "./FileUpload.module.scss";
import CssLoader from "utils/cssloader";
import Button from "components/buttons";

const loader = new CssLoader(styles);

const FileUpload: React.FC<FileUploadProps> = ({
	onFileSelected,
	id,
	accpet,
	...rest
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			onFileSelected?.(event.target.files[0]);
		}
	};

	return (
		<div className={loader.load("file-upload")}>
			<Button
				testId={id}
				{...rest}
				onClick={() => {
					inputRef.current?.click();
				}}
			/>
			<input
				ref={inputRef}
				{...(accpet && { accept: accpet })}
				type="file"
				onChange={handleFileChange}
			/>
		</div>
	);
};

export default FileUpload;
