'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'
import CreatorDashboard from "@/components/dashboard/CreatorDashboard"
import FanDashboard from "@/components/dashboard/FanDashboard"
import HubSelector from "@/components/dashboard/HubSelector"
import PlanConfirmation from "@/components/dashboard/PlanConfirmation"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import withAuth from "@/utils/withAuth"
function Dashboard() {
  const usersDetails = useSelector((state: RootState) => state.userDetails);
  const RenderDashboards = () => {

    if (!usersDetails.isActive && usersDetails.isCreator) {
      return (<PlanConfirmation />)
    }
    if (usersDetails.isCreator && !usersDetails.activeHub) {
      return (<HubSelector />)
    }

    if (!usersDetails.isCreator) {
      return (<FanDashboard />)
    }

    if (usersDetails.isCreator && usersDetails.activeHub && usersDetails.isActive) {
      return (<CreatorDashboard />)
    }

  }
  return (
    <main className="flex-1 p-8 overflow-auto">
      <RenderDashboards />
    </main>
  );
}
export default withAuth(Dashboard);