import { useToastStore } from "./useToastStore";
import { Toaster } from "./Toaster";

const { toast } = useToastStore.getState();

export { Toaster, toast };
