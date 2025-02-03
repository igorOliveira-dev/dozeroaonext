import { redirect } from "next/navigation";

export default function DiscordRedirectPage() {
  redirect(process.env.DISCORD_LINK);
}
