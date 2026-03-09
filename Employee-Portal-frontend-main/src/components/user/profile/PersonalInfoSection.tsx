const PersonalInfoSection = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="space-y-3 text-sm">
        <InfoRow label="Full Name" value="John Doe" />
        <InfoRow label="Employee ID" value="EMP-2024-0042" />
        <InfoRow label="Email" value="[email protected]" />
        <InfoRow label="Department" value="Engineering" />
        <InfoRow label="Designation" value="Software Engineer" />
        <InfoRow label="Joined" value="March 15, 2025" />
        <InfoRow label="Auth Method" value="LDAP (Organization)" />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);

export default PersonalInfoSection;