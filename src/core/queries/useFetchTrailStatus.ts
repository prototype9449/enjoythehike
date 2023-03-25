import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BookTrailPayload, checkTrailStatus } from '../trail'
import { useSnackbar } from 'notistack'

export const useFetchTrailStatus = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = useMutation(
    async ({ trailId, optionId }: BookTrailPayload) => {
      return checkTrailStatus({ trailId, optionId });
    },
    {
      mutationKey: ['fetchStatus'],
      onSuccess: (data, {trailId, optionId}) =>{
        if(data.status === 'inProcess') {
          setTimeout(() => {
            mutate({trailId, optionId})
          }, 3000)
        } else if(data.status === 'success') {
          queryClient.invalidateQueries({
            queryKey: ['bookings']
          });
        }
      },
      onError: (e, bookPayload, context) => {
        enqueueSnackbar("Oops, some error occurred while fetching the order status");
      },
    }
  );

  return { checkTrailStatus: mutate, isLoading };
}
