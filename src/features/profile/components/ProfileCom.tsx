import React, { useEffect } from "react";
import { ProfileProps } from "./Props";
import { useAuthenticateStore } from "features/authenticate";
import Form, { FormData } from "components/forms";
import {
	DigitOnlyRule,
	EmailRule,
	MaxLengthRule,
} from "components/forms/rules";
import ProfileClient from "../services/ProfileClient";
import ToastService from "services/toast";
import { ProfileSchema } from "../data/types";
import styles from "./ProfileCom.module.scss";
import CssLoader from "utils/cssloader";
import FileUpload from "components/file-upload";
import Button from "components/buttons";
import useAvatarStore from "../store/AvatarStore";
import Avatar from "features/avatar";

const toast = ToastService.getInstance();
const loader = new CssLoader(styles);

const ProfileCom: React.FC<ProfileProps> = () => {
	const username = useAuthenticateStore((state) => state.username);
	const client = new ProfileClient();
	const setAvatar = useAvatarStore((state) => state.setAvatar);
	const [profile, setProfile] = React.useState<ProfileSchema>(
		{} as ProfileSchema
	);

	useEffect(() => {
		const fetchProfile = async () => {
			const response = await client.getProfile();

			if (response.isSuccess()) {
				const profile = response.getData<ProfileSchema>();
				setAvatar(profile.avatar_url);
				setProfile({ ...profile });
			}
		};

		fetchProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = async (values: FormData) => {
		values.avatar_url = profile.avatar_url;
		const response = await client.updateProfile(values);

		if (response.isSuccess()) {
			toast.addMessage({
				message: "Profile updated successfully",
				type: "success",
				duration: 1000,
			});
			setAvatar(profile.avatar_url);
		} else {
			toast.addMessage({
				message: "Failed to update profile",
				type: "error",
				duration: 1000,
			});
		}
	};

	const convertFileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				const base64String = reader.result?.toString().split(",")[1];
				if (base64String) {
					resolve(base64String);
				} else {
					reject(
						new Error("Failed to convert file to base64 string")
					);
				}
			};

			reader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const onFileSelected = async (file: File) => {
		try {
			const base64String = await convertFileToBase64(file);
			setProfile({ ...profile, avatar_url: base64String });
		} catch (error) {
			toast.addMessage({
				message: "Failed to upload avatar",
				type: "error",
				duration: 1000,
			});
		}
	};

	return (
		<div className={loader.load("container")}>
			<div className={loader.load("content")}>
				<div className={loader.load("avatar")}>
					<Avatar avatar_url={profile.avatar_url} size={200} />
					<div className={loader.load("avatar-btn-group")}>
						<FileUpload
							id="avatar-upload"
							className={loader.load("avatar-upload")}
							accpet=".png;"
							secondary
							onFileSelected={onFileSelected}
							text="Upload Avatar"
						/>
						<Button
							text="Remove Avatar"
							onClick={() => {
								setProfile({ ...profile, avatar_url: "" });
							}}
							secondary
						/>
					</div>
				</div>
				<div
					data-testid="profile-com"
					className={loader.load("profile-com")}
				>
					<Form
						submitFunc={onSubmit}
						title="Profile"
						inputs={[
							{
								name: "username",
								testId: "username",
								default: username,
								readonly: true,
							},
							{
								name: "email",
								testId: "email",
								placeholder: "Enter your email",
								validations: [EmailRule],
								type: "email",
								default: profile.email,
							},
							{
								name: "first_name",
								label: "First Name",
								testId: "first-name",
								placeholder: "Enter your first name",
								default: profile.first_name,
								validations: [MaxLengthRule(30)],
							},
							{
								name: "last_name",
								label: "Last Name",
								testId: "last-name",
								placeholder: "Enter your last name",
								default: profile.last_name,
								validations: [MaxLengthRule(30)],
							},
							{
								name: "address",
								testId: "address",
								placeholder: "Enter your address",
								validations: [MaxLengthRule(40)],
								default: profile.address,
							},
							{
								name: "phone",
								testId: "phone",
								placeholder: "Enter your phone number",
								validations: [DigitOnlyRule, MaxLengthRule(10)],
								default: profile.phone,
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileCom;
