
import ProfileCardComponent from "@/components/effects/ProfileCard";

export function HeroProfileCard() {
  return (
    <ProfileCardComponent
        avatarUrl="/images/profile.png"
        name="Dhafin Aksanidra"
        handle="dhafin.as"
        title=""
        status="Online"
        showUserInfo={true}
        contactText="Contact"
        onContactClick={() => {
            window.location.href = "/contact";
        }}
        theme="dark"
        radius={12}
        holo={0.05}
        glare={1}
        enableTilt={true}
        tiltStrength={7}
        parallax={3}
        intro={true}
        className="mx-auto w-full max-w-[340px]"
        />
  );
}
