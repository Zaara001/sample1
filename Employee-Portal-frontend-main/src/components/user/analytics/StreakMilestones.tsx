const StreakMilestones = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">
        🔥 Streak & Milestones
      </h2>

      <div className="text-center">
        <div className="text-6xl">🔥</div>
        <p className="text-3xl font-bold mt-2 text-orange-500">7</p>
        <p className="text-sm text-gray-500">day on-time streak</p>
      </div>

      <div className="mt-8 space-y-4 text-sm">
        <div className="flex justify-between border-t pt-4">
          <span>Best Streak</span>
          <span className="font-semibold">15 days 🏆</span>
        </div>
        <div className="flex justify-between border-t pt-4">
          <span>Total Present</span>
          <span className="font-semibold">118 days</span>
        </div>
        <div className="flex justify-between border-t pt-4">
          <span>Since Joined</span>
          <span className="font-semibold">Mar 2025</span>
        </div>
      </div>
    </div>
  );
};

export default StreakMilestones;