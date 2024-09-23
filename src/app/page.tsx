import MapView from "@/app/components/Map/mapView";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <MapView />
        </div>
      </div>
    </div>
  );
}
