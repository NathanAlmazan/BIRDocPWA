import { useDispatch } from 'react-redux'
import type { StoreDispatch } from '../store'

const useAppDispatch: () => StoreDispatch = useDispatch

export default useAppDispatch