const Preferences = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Preferences</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Language</label>
          <select className="w-full border rounded-lg p-2">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Theme</label>
          <select className="w-full border rounded-lg p-2">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Preferences;