import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty,
      },
      {
        onSuccess: (data) => {
          setShowCreateModel(false);
          navigate(`/session/${data.session._id}`);
        },
      },
    );
  };
  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionData?.sessions || [];

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModel(true)} />

        {/* Grid Layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid0cols-1 lg:grid-cols-3 gap-6">
            <StatsCards />
            <ActiveSessions />
          </div>
          <RecentSessions />
        </div>
      </div>
      <CreateSessionModal
        isOpen={showCreateModel}
        onClose={() => setShowCreateModel(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default DashboardPage;
