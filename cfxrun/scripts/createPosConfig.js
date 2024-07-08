import { execa } from "execa";
import fs from "node:fs/promises";
import YAML from 'yaml'


export async function createPosConfig(chainId) {
  await execa`pos-genesis-tool random --initial-seed=0000000000000000000000000000000000000000000000000000000000000000  --num-validator=1 --num-genesis-validator=1 --chain-id=${chainId}`;

  const waypoint_config  =  await fs.readFile('./waypoint_config', 'utf8');
  const posConfigRaw = await fs.readFile('../pos_config/pos_config.yaml', 'utf8');

  const posConfig = YAML.parse(posConfigRaw);
  console.log("posConfig", posConfig);
  posConfig.base.waypoint.from_config = waypoint_config;
  console.log("update posConfig", posConfig);
  await fs.writeFile('../pos_config/pos_config.yaml', YAML.stringify(posConfig));
  await execa`ls -l`
  await execa`mv ./genesis_file ../pos_config/genesis_file`;

  await execa`mv ./initial_nodes.json ../pos_config/initial_nodes.json`;
}
