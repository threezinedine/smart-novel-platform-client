import Client from "services/request";
import { ProfileSchema } from "../data/types";
import { FormData } from "components/forms";

class ProfileClient extends Client {
	async updateProfile(data: FormData) {
		const newProfile: ProfileSchema = {
			email: data.email || "",
			first_name: data.first_name || "",
			last_name: data.last_name || "",
			address: data.address || "",
			phone: data.phone || "",
			email_verified: false,
			avatar_url: data.avatar_url || "",
		};

		return await this.put<ProfileSchema>("profiles", newProfile, true);
	}

	async getProfile() {
		return await this.get("profiles", true);
	}
}

export default ProfileClient;
