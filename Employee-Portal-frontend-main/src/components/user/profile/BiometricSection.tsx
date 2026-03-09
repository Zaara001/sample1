const BiometricSection = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Biometric Info</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Device ID</span>
          <span>BIO-DEV-004</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Fingerprint</span>
          <span className="text-green-600 font-medium">Registered ✔</span>
        </div>
      </div>
    </div>
  );
};

export default BiometricSection;