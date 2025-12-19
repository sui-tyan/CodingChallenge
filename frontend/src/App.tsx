import "./App.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FormRenderer from "./components/form_components/FormRenderer";
import type { FormSchema } from "@/types/formSchema";
import { useDispatch, useSelector } from "react-redux";
import FormCustomization from "./components/form_components/FormCustomization";
import { useApi } from "./hooks/useApi";
import { useEffect, useState } from "react";
import { addSchemaId } from "./slice/formSlice";

function App() {
  const [formSchema, setFormSchema] = useState<FormSchema[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    useApi
      .get("/forms/get-schema")
      .then((response) => {
        setFormSchema(response.data.fields);
        dispatch(addSchemaId(response.data._id));
      })
      .catch((error) => {
        console.log("Error fetching form schema:", error);
      });
  }, []);

  const currentPage: string = useSelector(
    (state: any) => state.page.currentPage
  );

  const renderCurentPage = () => {
    switch (currentPage) {
      case "create-form":
        return <FormCustomization />;
      case "form":
        return <FormRenderer formSchema={formSchema} />;
      default:
        return <FormCustomization />;
    }
  };

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">{renderCurentPage()}</div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
