import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import GitHub from '@mui/icons-material/GitHub';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';

function RepoComponent(props) {

  return (
    <Card className="repo" sx={{ height: '100%' }}>
      <CardHeader
        title={props.repo.name}>

      </CardHeader>
      <IconButton size="small" color="primary" href={props.repo.html_url} target="_blank">
        <GitHub fontSize="inherit" />Stars: {props.repo.stargazers_count}
      </IconButton>

      <CardContent>
        <div>{props.repo.description}</div>
        <div>Language: {props.repo.language}</div>
      </CardContent>

      <IconButton onClick={() => props.saveFavourite(props.repo)}>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      </IconButton>
    </Card>
  )
}

export default RepoComponent;