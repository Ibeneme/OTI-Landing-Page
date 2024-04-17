import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/ssidebar.css";
import {
  MdHive,
  MdLabelImportantOutline,
  MdNewLabel,
  MdOutlineLabelImportant,
  MdOutlineTag,
  MdSpaceDashboard,
} from "react-icons/md";
import {
  TbTicket,
  TbSettings,
  TbUserEdit,
  TbUsers,
  TbForms,
  TbDatabase,
  //TbCardsFilled,
} from "react-icons/tb";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../../../Redux/Tickets/Tickets";
import { getProfile } from "../../../../Redux/Profile/Profile";
import { useLoading } from "../../../Hook/useTicketLoading";
// import useFetchAllTickets from "./Hook/useTickets";

export interface MenuItem {
  icon: React.ReactNode;
  text: string;
  to: string;
  number?: any;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

// interface User {
//   first_name: string;
//   last_name: string;
//   email: string;
// }

interface SidebarProps {
  image?: string;
}

const MainSidebar: React.FC<SidebarProps> = () => {
  // const { loading, allTickets } = useFetchAllTickets();

  //const [srmUser, setSrmUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [allTickets, setAllTickets] = useState<any | null>(null);
  const { SRMTicketsLoading } = useLoading();
  //console.log(srmUser);
  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const result = await dispatch(getAllTickets());
        setAllTickets(result.payload);
      } catch (error) {
      } finally {
      }
    };

    if (SRMTicketsLoading) {
      fetchAllTickets();
    }

    fetchAllTickets();
  }, [dispatch]);

  const overdueItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `overdue`;
      }
    }
  );
  const dueItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `due`;
      }
    }
  );
  const open = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status === `open`;
      }
    }
  );
  const unResolved = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (allTickets) {
        return ticket.status !== `resolved`;
      }
    }
  );

  const menuData: MenuCategory[] = [
    {
      title: "",
      items: [
        { icon: <MdSpaceDashboard />, text: "Dashboard", to: "/home" },
        { icon: <TbTicket />, text: "Tickets", to: "/tickets" },
        { icon: <TbForms />, text: "Feedback", to: "/feedback-forms" },
        // { icon: <TbCardsFilled />, text: "Logs", to: "/logs" },
        {
          icon: <TbDatabase />,
          text: "Stakeholder Database",
          to: "/stakeholders",
        },
      ],
    },
    {
      title: "Tickets by Status",
      items: [
        {
          icon: <MdLabelImportantOutline />,
          text: "Due Tickets",
          to: "/due-tickets",
          number: dueItems?.length,
        },
        {
          icon: <MdOutlineLabelImportant />,
          text: "Overdue Tickets",
          to: "/overdue-tickets",
          number: overdueItems?.length,
        },
        {
          icon: <MdNewLabel />,
          text: "Open Tickets",
          to: "/new-tickets",
          number: open?.length,
        },
        {
          icon: <MdHive />,
          text: "Unresolved Tickets",
          to: "/unresolved-tickets",
          number: unResolved?.length,
        },
        {
          icon: <MdOutlineTag />,
          text: "Resolved Tickets",
          to: "/resolved-tickets",
          number: 0,
        },
        // {
        //   icon: <MdOutlineTag />,
        //   text: "Closed Tickets",
        //   to: "/closed-tickets",
        //   number: closedItems?.length,
        // },
      ],
    },

    {
      title: "SETTINGS",
      items: [
        {
          icon: <TbUsers />,
          text: "Departments",
          to: "/frontdesk",
        },
        {
          icon: <TbSettings />,
          text: "Organization Settings",
          to: "/settings",
        },
        { icon: <TbUserEdit />, text: "Account Settings", to: "/Profile" },
      ],
    },
  ];

  const [loading, setLoading] = useState(false);
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfile()).then(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
        setLoading(false);
      });
    }
  }, [profile]);
  const navigate = useNavigate();

  return (
    <div className="sidebar-main" onClick={() => setLoading(true)}>
      <div>
        <div className="sidebar-title-div" onClick={() => navigate("/")}>
          <h2 className="sidebar-title" style={{ cursor: "pointer" }}>
            SRM
          </h2>
        </div>
        <br /> <br />
        <div className="sidebar-headers"></div>
        {menuData.map((menu, index) => (
          <div key={index}>
            <p className="title-sidebar-p">{menu.title}</p>
            {menu.items.map((item, subIndex) => (
              <div key={subIndex} className="sidebar-headers">
                {userProfile?.permission_type === "support" &&
                (item.text === "Organization Settings" ||
                  item.text === "Departments") ? null : (
                  <NavLink
                    to={item.to}
                    className="link"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {item.icon} {item.text}
                    </span>
                    <span style={{ fontSize: 24, position: "relative" }}>
                      {item?.number ? (
                        <p className="tickets-number-unread-sidebar">
                          {item?.number}
                        </p>
                      ) : null}
                    </span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            height: 100,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MainSidebar;
