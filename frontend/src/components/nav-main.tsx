import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { changeRenderedPage } from "@/slice/pageSlice";
import { deleteFormSchema } from "@/slice/formSlice";
import { useApi } from "@/hooks/useApi";
import { useSelector } from "react-redux";

export function NavMain() {
  const dispatch = useDispatch();
  const { schemaId } = useSelector((state: any) => state.form);

  const handleDeleteSchema = () => {
    dispatch(deleteFormSchema());
    useApi
      .delete(`/forms/delete-schema/${schemaId}`)
      .then((response) => {
        console.log("Form schema deleted successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error deleting form schema:", error);
      });
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenuItem className="flex items-center gap-2">
          <SidebarMenuButton
            onClick={() => dispatch(changeRenderedPage("create-form"))}
            tooltip="Create Form"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground min-w-8 duration-200 ease-linear justify-center"
          >
            <span>Create Form</span>
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={() => dispatch(changeRenderedPage("form"))}
            tooltip="View Form"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground min-w-8 duration-200 ease-linear justify-center"
          >
            <span>View Form</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleDeleteSchema}
            tooltip="Delete Form Schema"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground min-w-8 duration-200 ease-linear justify-center"
          >
            <span>Delete Form Schema</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
